/**
 * GA4 Analytics Dashboard - Main Application
 * Handles OAuth, API calls, data processing, and chart rendering
 */

// ========================================
// Global State
// ========================================
let tokenClient;
let accessToken = null;
let currentDateRange = '30days';
let charts = {};

// Date range mappings
const DATE_RANGES = {
    'today': { start: 'today', end: 'today', label: 'Today' },
    '7days': { start: '7daysAgo', end: 'today', label: 'Last 7 Days' },
    '30days': { start: '30daysAgo', end: 'today', label: 'Last 30 Days' },
    '90days': { start: '90daysAgo', end: 'today', label: 'Last 90 Days' }
};

// ========================================
// Demo Data (Used when not connected to GA4)
// ========================================
const DEMO_DATA = {
    overview: {
        totalUsers: 12847,
        usersChange: '+12.5%',
        sessions: 18432,
        sessionsChange: '+8.3%',
        pageviews: 45231,
        pageviewsChange: '+15.2%',
        bounceRate: '42.3%',
        bounceChange: '-3.1%',
        avgDuration: '2m 34s',
        durationChange: '+18.7%',
        engagementRate: '67.8%',
        engagementChange: '+5.4%'
    },
    usersOverTime: {
        labels: ['Jan 3', 'Jan 5', 'Jan 7', 'Jan 9', 'Jan 11', 'Jan 13', 'Jan 15', 'Jan 17', 'Jan 19', 'Jan 21', 'Jan 23', 'Jan 25', 'Jan 27', 'Jan 29', 'Jan 31'],
        users: [320, 450, 380, 520, 610, 480, 390, 550, 670, 580, 720, 650, 810, 750, 890],
        newUsers: [180, 250, 200, 310, 380, 260, 210, 320, 410, 340, 450, 380, 520, 440, 580]
    },
    trafficSources: [
        { source: 'Organic Search', users: 5420, color: '#6366f1' },
        { source: 'Direct', users: 3210, color: '#8b5cf6' },
        { source: 'Social', users: 2180, color: '#06b6d4' },
        { source: 'Referral', users: 1450, color: '#10b981' },
        { source: 'Email', users: 587, color: '#f59e0b' }
    ],
    topPages: [
        { title: 'Homepage', path: '/', views: 12450, users: 8320, avgTime: '1m 45s' },
        { title: 'Products', path: '/products', views: 8230, users: 5410, avgTime: '2m 12s' },
        { title: 'About Us', path: '/about', views: 4520, users: 3890, avgTime: '1m 28s' },
        { title: 'Contact', path: '/contact', views: 3210, users: 2780, avgTime: '0m 52s' },
        { title: 'Blog', path: '/blog', views: 2890, users: 2340, avgTime: '3m 15s' }
    ],
    devices: [
        { name: 'Desktop', users: 6840, percent: 53.2, icon: '💻' },
        { name: 'Mobile', users: 5120, percent: 39.9, icon: '📱' },
        { name: 'Tablet', users: 887, percent: 6.9, icon: '📲' }
    ],
    browsers: [
        { name: 'Chrome', users: 7250 },
        { name: 'Safari', users: 2890 },
        { name: 'Firefox', users: 1450 },
        { name: 'Edge', users: 980 },
        { name: 'Other', users: 277 }
    ],
    countries: [
        { name: 'Portugal', code: 'PT', flag: '🇵🇹', users: 4520 },
        { name: 'Brazil', code: 'BR', flag: '🇧🇷', users: 2180 },
        { name: 'Spain', code: 'ES', flag: '🇪🇸', users: 1890 },
        { name: 'United States', code: 'US', flag: '🇺🇸', users: 1450 },
        { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', users: 980 }
    ],
    userTypes: {
        new: 7820,
        returning: 5027
    }
};

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();

    // Initialize charts
    initializeCharts();

    // Check if we should use demo mode or try to connect
    if (GA4_CONFIG.DEMO_MODE || GA4_CONFIG.CLIENT_ID === 'YOUR_CLIENT_ID_HERE') {
        loadDemoData();
        showToast('Running in Demo Mode. Connect your GA4 account for real data.', 'info');
    } else {
        initializeGoogleAuth();
    }
}

function setupEventListeners() {
    // Auth button
    const authBtn = document.getElementById('auth-btn');
    authBtn.addEventListener('click', handleAuthClick);

    // Date range buttons
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentDateRange = e.target.dataset.range;
            refreshData();
        });
    });
}

// ========================================
// Google OAuth Integration
// ========================================
function initializeGoogleAuth() {
    try {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: GA4_CONFIG.CLIENT_ID,
            scope: GA4_CONFIG.SCOPES,
            callback: handleAuthResponse
        });
    } catch (error) {
        console.error('Failed to initialize Google Auth:', error);
        showToast('Failed to initialize Google Auth. Using demo mode.', 'error');
        loadDemoData();
    }
}

function handleAuthClick() {
    if (GA4_CONFIG.CLIENT_ID === 'YOUR_CLIENT_ID_HERE') {
        showToast('Please configure your Client ID in config.js first.', 'error');
        return;
    }

    if (!tokenClient) {
        initializeGoogleAuth();
    }

    if (accessToken) {
        // Already authenticated, revoke and re-authenticate
        google.accounts.oauth2.revoke(accessToken, () => {
            accessToken = null;
            tokenClient.requestAccessToken({ prompt: 'consent' });
        });
    } else {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    }
}

function handleAuthResponse(response) {
    if (response.error) {
        console.error('Auth error:', response.error);
        showToast('Authentication failed: ' + response.error, 'error');
        return;
    }

    accessToken = response.access_token;
    updateConnectionStatus(true);
    showToast('Successfully connected to Google Analytics!', 'success');

    // Update auth button
    const authBtn = document.getElementById('auth-btn');
    authBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span>Connected</span>
    `;

    // Load real data
    refreshData();
}

function updateConnectionStatus(connected) {
    const status = document.getElementById('connection-status');
    if (connected) {
        status.className = 'connection-status connected';
        status.querySelector('.status-text').textContent = 'Connected';
    } else {
        status.className = 'connection-status disconnected';
        status.querySelector('.status-text').textContent = 'Demo Mode';
    }
}

// ========================================
// Data Loading
// ========================================
async function refreshData() {
    showLoading(true);

    if (accessToken && GA4_CONFIG.PROPERTY_ID !== 'YOUR_PROPERTY_ID_HERE') {
        await loadRealData();
    } else {
        loadDemoData();
    }

    showLoading(false);
}

function loadDemoData() {
    updateOverviewMetrics(DEMO_DATA.overview);
    updateUsersChart(DEMO_DATA.usersOverTime);
    updateTrafficChart(DEMO_DATA.trafficSources);
    updateTopPagesTable(DEMO_DATA.topPages);
    updateDevicesGrid(DEMO_DATA.devices);
    updateBrowsersChart(DEMO_DATA.browsers);
    updateCountriesList(DEMO_DATA.countries);
    updateUserTypesChart(DEMO_DATA.userTypes);
}

async function loadRealData() {
    const dateRange = DATE_RANGES[currentDateRange];

    try {
        // Fetch all data in parallel
        const [overview, usersTime, traffic, pages, devices, browsers, countries] = await Promise.all([
            fetchOverviewMetrics(dateRange),
            fetchUsersOverTime(dateRange),
            fetchTrafficSources(dateRange),
            fetchTopPages(dateRange),
            fetchDevices(dateRange),
            fetchBrowsers(dateRange),
            fetchCountries(dateRange)
        ]);

        // Update all components
        updateOverviewMetrics(overview);
        updateUsersChart(usersTime);
        updateTrafficChart(traffic);
        updateTopPagesTable(pages);
        updateDevicesGrid(devices);
        updateBrowsersChart(browsers);
        updateCountriesList(countries);

    } catch (error) {
        console.error('Error loading data:', error);
        showToast('Error loading analytics data. Using demo data.', 'error');
        loadDemoData();
    }
}

// ========================================
// GA4 API Calls
// ========================================
async function makeGA4Request(body) {
    const response = await fetch(
        `${GA4_CONFIG.API_ENDPOINT}/properties/${GA4_CONFIG.PROPERTY_ID}:runReport`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    );

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
}

async function fetchOverviewMetrics(dateRange) {
    const response = await makeGA4Request({
        dateRanges: [
            { startDate: dateRange.start, endDate: dateRange.end },
            { startDate: getPreviousPeriodStart(dateRange), endDate: getPreviousPeriodEnd(dateRange) }
        ],
        metrics: [
            { name: 'totalUsers' },
            { name: 'sessions' },
            { name: 'screenPageViews' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
            { name: 'engagementRate' }
        ]
    });

    const current = response.rows[0].metricValues;
    const previous = response.rows[1]?.metricValues || current;

    return {
        totalUsers: formatNumber(current[0].value),
        usersChange: formatChange(current[0].value, previous[0].value),
        sessions: formatNumber(current[1].value),
        sessionsChange: formatChange(current[1].value, previous[1].value),
        pageviews: formatNumber(current[2].value),
        pageviewsChange: formatChange(current[2].value, previous[2].value),
        bounceRate: formatPercent(current[3].value),
        bounceChange: formatChange(current[3].value, previous[3].value, true),
        avgDuration: formatDuration(current[4].value),
        durationChange: formatChange(current[4].value, previous[4].value),
        engagementRate: formatPercent(current[5].value),
        engagementChange: formatChange(current[5].value, previous[5].value)
    };
}

async function fetchUsersOverTime(dateRange) {
    const response = await makeGA4Request({
        dateRanges: [{ startDate: dateRange.start, endDate: dateRange.end }],
        dimensions: [{ name: 'date' }],
        metrics: [
            { name: 'totalUsers' },
            { name: 'newUsers' }
        ],
        orderBys: [{ dimension: { dimensionName: 'date' } }]
    });

    const labels = [];
    const users = [];
    const newUsers = [];

    response.rows.forEach(row => {
        const date = row.dimensionValues[0].value;
        labels.push(formatDateLabel(date));
        users.push(parseInt(row.metricValues[0].value));
        newUsers.push(parseInt(row.metricValues[1].value));
    });

    return { labels, users, newUsers };
}

async function fetchTrafficSources(dateRange) {
    const response = await makeGA4Request({
        dateRanges: [{ startDate: dateRange.start, endDate: dateRange.end }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
        limit: 6
    });

    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

    return response.rows.map((row, i) => ({
        source: row.dimensionValues[0].value || 'Other',
        users: parseInt(row.metricValues[0].value),
        color: colors[i] || colors[5]
    }));
}

async function fetchTopPages(dateRange) {
    const response = await makeGA4Request({
        dateRanges: [{ startDate: dateRange.start, endDate: dateRange.end }],
        dimensions: [
            { name: 'pageTitle' },
            { name: 'pagePath' }
        ],
        metrics: [
            { name: 'screenPageViews' },
            { name: 'totalUsers' },
            { name: 'averageSessionDuration' }
        ],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 5
    });

    return response.rows.map(row => ({
        title: row.dimensionValues[0].value || 'Unknown',
        path: row.dimensionValues[1].value,
        views: formatNumber(row.metricValues[0].value),
        users: formatNumber(row.metricValues[1].value),
        avgTime: formatDuration(row.metricValues[2].value)
    }));
}

async function fetchDevices(dateRange) {
    const response = await makeGA4Request({
        dateRanges: [{ startDate: dateRange.start, endDate: dateRange.end }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'totalUsers' }]
    });

    const total = response.rows.reduce((sum, row) => sum + parseInt(row.metricValues[0].value), 0);
    const icons = { desktop: '💻', mobile: '📱', tablet: '📲' };

    return response.rows.map(row => {
        const name = row.dimensionValues[0].value;
        const users = parseInt(row.metricValues[0].value);
        return {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            users: users,
            percent: ((users / total) * 100).toFixed(1),
            icon: icons[name.toLowerCase()] || '🖥️'
        };
    });
}

async function fetchBrowsers(dateRange) {
    const response = await makeGA4Request({
        dateRanges: [{ startDate: dateRange.start, endDate: dateRange.end }],
        dimensions: [{ name: 'browser' }],
        metrics: [{ name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
        limit: 5
    });

    return response.rows.map(row => ({
        name: row.dimensionValues[0].value || 'Other',
        users: parseInt(row.metricValues[0].value)
    }));
}

async function fetchCountries(dateRange) {
    const response = await makeGA4Request({
        dateRanges: [{ startDate: dateRange.start, endDate: dateRange.end }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
        limit: 5
    });

    return response.rows.map(row => ({
        name: row.dimensionValues[0].value || 'Unknown',
        code: getCountryCode(row.dimensionValues[0].value),
        flag: getCountryFlag(row.dimensionValues[0].value),
        users: parseInt(row.metricValues[0].value)
    }));
}

// ========================================
// UI Update Functions
// ========================================
function updateOverviewMetrics(data) {
    document.getElementById('total-users').textContent = data.totalUsers;
    document.getElementById('users-change').textContent = data.usersChange;
    updateChangeClass('users-change', data.usersChange);

    document.getElementById('total-sessions').textContent = data.sessions;
    document.getElementById('sessions-change').textContent = data.sessionsChange;
    updateChangeClass('sessions-change', data.sessionsChange);

    document.getElementById('total-pageviews').textContent = data.pageviews;
    document.getElementById('pageviews-change').textContent = data.pageviewsChange;
    updateChangeClass('pageviews-change', data.pageviewsChange);

    document.getElementById('bounce-rate').textContent = data.bounceRate;
    document.getElementById('bounce-change').textContent = data.bounceChange;
    updateChangeClass('bounce-change', data.bounceChange, true);

    document.getElementById('avg-duration').textContent = data.avgDuration;
    document.getElementById('duration-change').textContent = data.durationChange;
    updateChangeClass('duration-change', data.durationChange);

    document.getElementById('engagement-rate').textContent = data.engagementRate;
    document.getElementById('engagement-change').textContent = data.engagementChange;
    updateChangeClass('engagement-change', data.engagementChange);
}

function updateChangeClass(elementId, value, inverse = false) {
    const el = document.getElementById(elementId);
    el.classList.remove('positive', 'negative', 'neutral');

    if (value.startsWith('+')) {
        el.classList.add(inverse ? 'negative' : 'positive');
    } else if (value.startsWith('-')) {
        el.classList.add(inverse ? 'positive' : 'negative');
    } else {
        el.classList.add('neutral');
    }
}

function updateTopPagesTable(pages) {
    const tbody = document.querySelector('#pages-table tbody');
    tbody.innerHTML = pages.map(page => `
        <tr>
            <td title="${page.path}">${page.title}</td>
            <td>${page.views}</td>
            <td>${page.users}</td>
            <td>${page.avgTime}</td>
        </tr>
    `).join('');
}

function updateDevicesGrid(devices) {
    const grid = document.getElementById('devices-grid');
    grid.innerHTML = devices.map(device => `
        <div class="device-item">
            <div class="device-icon">${device.icon}</div>
            <div class="device-name">${device.name}</div>
            <div class="device-value">${formatNumber(device.users)}</div>
            <div class="device-percent">${device.percent}%</div>
        </div>
    `).join('');
}

function updateCountriesList(countries) {
    const list = document.getElementById('countries-list');
    const maxUsers = Math.max(...countries.map(c => c.users));

    list.innerHTML = countries.map(country => `
        <div class="country-item">
            <span class="country-flag">${country.flag}</span>
            <div class="country-info">
                <div class="country-name">${country.name}</div>
                <div class="country-bar">
                    <div class="country-bar-fill" style="width: ${(country.users / maxUsers * 100).toFixed(0)}%"></div>
                </div>
            </div>
            <span class="country-users">${formatNumber(country.users)}</span>
        </div>
    `).join('');
}

// ========================================
// Chart Functions
// ========================================
function initializeCharts() {
    Chart.defaults.color = '#a1a1aa';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)';
    Chart.defaults.font.family = "'Inter', sans-serif";
}

function updateUsersChart(data) {
    const ctx = document.getElementById('users-chart').getContext('2d');

    if (charts.users) {
        charts.users.destroy();
    }

    charts.users = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Total Users',
                    data: data.users,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#6366f1',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                },
                {
                    label: 'New Users',
                    data: data.newUsers,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.05)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#8b5cf6',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 8,
                        boxHeight: 8,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 30, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#a1a1aa',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 4
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { maxTicksLimit: 8 }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        callback: value => formatCompactNumber(value)
                    }
                }
            }
        }
    });
}

function updateTrafficChart(sources) {
    const ctx = document.getElementById('traffic-chart').getContext('2d');

    if (charts.traffic) {
        charts.traffic.destroy();
    }

    charts.traffic = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sources.map(s => s.source),
            datasets: [{
                data: sources.map(s => s.users),
                backgroundColor: sources.map(s => s.color),
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 30, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#a1a1aa',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => ` ${formatNumber(context.raw)} users`
                    }
                }
            }
        }
    });
}

function updateBrowsersChart(browsers) {
    const ctx = document.getElementById('browsers-chart').getContext('2d');

    if (charts.browsers) {
        charts.browsers.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.8)');

    charts.browsers = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: browsers.map(b => b.name),
            datasets: [{
                data: browsers.map(b => b.users),
                backgroundColor: gradient,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 30, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#a1a1aa',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => ` ${formatNumber(context.raw)} users`
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        callback: value => formatCompactNumber(value)
                    }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

function updateUserTypesChart(data) {
    const ctx = document.getElementById('users-type-chart').getContext('2d');

    if (charts.userTypes) {
        charts.userTypes.destroy();
    }

    charts.userTypes = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['New Users', 'Returning Users'],
            datasets: [{
                data: [data.new, data.returning],
                backgroundColor: ['#6366f1', '#8b5cf6'],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        padding: 16,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 30, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#a1a1aa',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => ` ${formatNumber(context.raw)} users`
                    }
                }
            }
        }
    });
}

// ========================================
// Utility Functions
// ========================================
function formatNumber(num) {
    const n = parseInt(num);
    if (isNaN(n)) return '0';
    return n.toLocaleString();
}

function formatCompactNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatPercent(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return '0%';
    return (num * 100).toFixed(1) + '%';
}

function formatDuration(seconds) {
    const s = parseFloat(seconds);
    if (isNaN(s) || s === 0) return '0m 0s';
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}m ${secs}s`;
}

function formatChange(current, previous, inverse = false) {
    const c = parseFloat(current);
    const p = parseFloat(previous);

    if (isNaN(c) || isNaN(p) || p === 0) return '0%';

    const change = ((c - p) / p) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
}

function formatDateLabel(dateStr) {
    // GA4 returns dates as YYYYMMDD
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);

    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getPreviousPeriodStart(dateRange) {
    const days = {
        'today': 1,
        '7days': 7,
        '30days': 30,
        '90days': 90
    };
    return `${days[currentDateRange] * 2}daysAgo`;
}

function getPreviousPeriodEnd(dateRange) {
    const days = {
        'today': 1,
        '7days': 7,
        '30days': 30,
        '90days': 90
    };
    return `${days[currentDateRange] + 1}daysAgo`;
}

function getCountryCode(countryName) {
    const codes = {
        'Portugal': 'PT', 'Brazil': 'BR', 'Spain': 'ES', 'United States': 'US',
        'United Kingdom': 'GB', 'France': 'FR', 'Germany': 'DE', 'Italy': 'IT',
        'Canada': 'CA', 'Australia': 'AU', 'Japan': 'JP', 'India': 'IN'
    };
    return codes[countryName] || 'UN';
}

function getCountryFlag(countryName) {
    const flags = {
        'Portugal': '🇵🇹', 'Brazil': '🇧🇷', 'Spain': '🇪🇸', 'United States': '🇺🇸',
        'United Kingdom': '🇬🇧', 'France': '🇫🇷', 'Germany': '🇩🇪', 'Italy': '🇮🇹',
        'Canada': '🇨🇦', 'Australia': '🇦🇺', 'Japan': '🇯🇵', 'India': '🇮🇳',
        'Netherlands': '🇳🇱', 'Belgium': '🇧🇪', 'Switzerland': '🇨🇭', 'Mexico': '🇲🇽',
        'Argentina': '🇦🇷', 'Chile': '🇨🇱', 'Colombia': '🇨🇴', 'Poland': '🇵🇱'
    };
    return flags[countryName] || '🌍';
}

// ========================================
// UI Helpers
// ========================================
function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (show) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-message">${message}</span>`;

    container.appendChild(toast);

    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}
