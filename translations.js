/**
 * GA4 Dashboard - Translations
 * Supports: English (en), Portuguese (pt)
 */
const TRANSLATIONS = {
    en: {
        // Header
        title: 'GA4 Analytics',
        today: 'Today',
        last7days: 'Last 7 Days',
        last30days: 'Last 30 Days',
        last90days: 'Last 90 Days',
        demoMode: 'Demo Mode',
        connected: 'Connected',
        connectGA4: 'Connect GA4',

        // Performance Score
        performanceScore: 'Performance Score',
        score: 'Score',
        connectToSeeScore: 'Connect to GA4 to see your score',
        excellentPerformance: 'Excellent! Your site is performing great.',
        goodPerformance: 'Good performance with room for improvement.',
        averagePerformance: 'Average performance. Consider the recommendations below.',
        needsImprovement: 'Needs improvement. Check the insights for suggestions.',

        // Score Factors
        userGrowthUp: 'User Growth ↑',
        userGrowthPlus: 'User Growth +',
        usersStable: 'Users Stable',
        usersDeclining: 'Users Declining',
        lowBounceRate: 'Low Bounce Rate',
        okBounceRate: 'OK Bounce Rate',
        highBounceRate: 'High Bounce Rate',
        veryHighBounce: 'Very High Bounce',
        highEngagement: 'High Engagement',
        okEngagement: 'OK Engagement',
        lowEngagement: 'Low Engagement',
        poorEngagement: 'Poor Engagement',
        longSessions: 'Long Sessions',
        okSessions: 'OK Sessions',
        shortSessions: 'Short Sessions',
        veryShortSessions: 'Very Short Sessions',

        // Quick Actions
        emailReports: 'Email Reports',
        refreshData: 'Refresh Data',

        // Metrics
        totalUsers: 'Total Users',
        sessions: 'Sessions',
        pageViews: 'Page Views',
        bounceRate: 'Bounce Rate',
        avgDuration: 'Avg. Duration',
        engagementRate: 'Engagement Rate',

        // Insights
        insightsTitle: '💡 Insights & Recommendations',
        aiPowered: 'AI-Powered',
        connectToGA4: 'Connect to GA4',
        connectMessage: 'Connect your Google Analytics account to receive personalized insights and recommendations.',

        // Insight Messages
        trafficGrowing: 'Traffic is Growing!',
        trafficGrowingText: 'Your traffic increased by {0}%. Keep doing what you\'re doing and consider boosting successful campaigns.',
        trafficDeclining: 'Traffic is Declining',
        trafficDecliningText: 'Consider investing in SEO, Google Ads, or social media marketing to attract more visitors.',
        highBounceRateTitle: 'High Bounce Rate',
        highBounceRateText: '{0}% of visitors leave without interacting. Improve your landing page content, speed, and calls-to-action.',
        greatRetention: 'Great User Retention',
        greatRetentionText: 'Visitors are engaging well with your content. Consider adding more conversion opportunities.',
        lowEngagementTitle: 'Low Engagement',
        lowEngagementText: 'Add interactive elements, videos, or compelling CTAs to increase user engagement on your pages.',
        lowPagesPerSession: 'Low Pages per Session',
        lowPagesPerSessionText: 'Users view fewer than 2 pages. Improve internal linking and add related content suggestions.',
        leadGenTip: 'Lead Generation Tip',
        leadGenTipText: 'Add a newsletter signup, contact form, or free resource download to convert visitors into leads.',
        lookingGood: 'Looking Good!',
        lookingGoodText: 'Your site metrics are healthy. Focus on maintaining current performance and testing new optimizations.',

        // Charts
        usersOverTime: 'Users Over Time',
        trafficSources: 'Traffic Sources',
        topPages: 'Top Pages',
        byViews: 'By Views',
        deviceBreakdown: 'Device Breakdown',
        browsers: 'Browsers',
        topCountries: 'Top Countries',
        byUsers: 'By Users',
        newVsReturning: 'New vs Returning',

        // Table Headers
        pageTitle: 'Page Title',
        views: 'Views',
        users: 'Users',
        avgTime: 'Avg. Time',

        // Email Modal
        emailModalTitle: '📧 Weekly Report Settings',
        emailModalDesc: 'Receive a weekly summary of your analytics with insights and recommendations.',
        emailAddress: 'Email Address',
        frequency: 'Frequency',
        weekly: 'Weekly (Every Monday)',
        biweekly: 'Bi-weekly',
        monthly: 'Monthly',
        emailNote: 'Email reports require EmailJS setup.',
        signUpFree: 'Sign up free →',
        sendTestEmail: 'Send Test Email',
        saveSettings: 'Save Settings',

        // Misc
        loading: 'Loading analytics data...',
        dataRefreshed: 'Data refreshed!',
        noData: 'No data',
        noDataPeriod: 'No data for this period'
    },

    pt: {
        // Header
        title: 'GA4 Analytics',
        today: 'Hoje',
        last7days: 'Últimos 7 Dias',
        last30days: 'Últimos 30 Dias',
        last90days: 'Últimos 90 Dias',
        demoMode: 'Modo Demo',
        connected: 'Conectado',
        connectGA4: 'Conectar GA4',

        // Performance Score
        performanceScore: 'Pontuação de Desempenho',
        score: 'Pontos',
        connectToSeeScore: 'Conecta ao GA4 para ver a tua pontuação',
        excellentPerformance: 'Excelente! O teu site está a funcionar muito bem.',
        goodPerformance: 'Bom desempenho com margem para melhoria.',
        averagePerformance: 'Desempenho médio. Considera as recomendações abaixo.',
        needsImprovement: 'Precisa de melhoria. Verifica as sugestões.',

        // Score Factors
        userGrowthUp: 'Crescimento ↑',
        userGrowthPlus: 'Crescimento +',
        usersStable: 'Utilizadores Estáveis',
        usersDeclining: 'Utilizadores em Queda',
        lowBounceRate: 'Baixa Taxa de Rejeição',
        okBounceRate: 'Taxa de Rejeição OK',
        highBounceRate: 'Alta Taxa de Rejeição',
        veryHighBounce: 'Rejeição Muito Alta',
        highEngagement: 'Alto Engagement',
        okEngagement: 'Engagement OK',
        lowEngagement: 'Baixo Engagement',
        poorEngagement: 'Engagement Fraco',
        longSessions: 'Sessões Longas',
        okSessions: 'Sessões OK',
        shortSessions: 'Sessões Curtas',
        veryShortSessions: 'Sessões Muito Curtas',

        // Quick Actions
        emailReports: 'Relatórios Email',
        refreshData: 'Atualizar Dados',

        // Metrics
        totalUsers: 'Total Utilizadores',
        sessions: 'Sessões',
        pageViews: 'Visualizações',
        bounceRate: 'Taxa de Rejeição',
        avgDuration: 'Duração Média',
        engagementRate: 'Taxa de Engagement',

        // Insights
        insightsTitle: '💡 Insights e Recomendações',
        aiPowered: 'IA',
        connectToGA4: 'Conectar ao GA4',
        connectMessage: 'Conecta a tua conta Google Analytics para receber insights e recomendações personalizadas.',

        // Insight Messages
        trafficGrowing: 'O Tráfego Está a Crescer!',
        trafficGrowingText: 'O teu tráfego aumentou {0}%. Continua assim e considera impulsionar campanhas de sucesso.',
        trafficDeclining: 'O Tráfego Está a Diminuir',
        trafficDecliningText: 'Considera investir em SEO, Google Ads ou marketing nas redes sociais.',
        highBounceRateTitle: 'Taxa de Rejeição Alta',
        highBounceRateText: '{0}% dos visitantes saem sem interagir. Melhora o conteúdo da landing page e os CTAs.',
        greatRetention: 'Ótima Retenção de Utilizadores',
        greatRetentionText: 'Os visitantes estão a interagir bem. Considera adicionar mais oportunidades de conversão.',
        lowEngagementTitle: 'Baixo Engagement',
        lowEngagementText: 'Adiciona elementos interativos, vídeos ou CTAs para aumentar o engagement.',
        lowPagesPerSession: 'Poucas Páginas por Sessão',
        lowPagesPerSessionText: 'Os utilizadores veem menos de 2 páginas. Melhora a ligação interna entre páginas.',
        leadGenTip: 'Dica de Geração de Leads',
        leadGenTipText: 'Adiciona newsletter, formulário de contacto ou download gratuito para converter visitantes em leads.',
        lookingGood: 'Está Tudo Bem!',
        lookingGoodText: 'As métricas do site estão saudáveis. Mantém o desempenho atual e testa novas otimizações.',

        // Charts
        usersOverTime: 'Utilizadores ao Longo do Tempo',
        trafficSources: 'Fontes de Tráfego',
        topPages: 'Páginas Principais',
        byViews: 'Por Visualizações',
        deviceBreakdown: 'Dispositivos',
        browsers: 'Navegadores',
        topCountries: 'Países Principais',
        byUsers: 'Por Utilizadores',
        newVsReturning: 'Novos vs Regressados',

        // Table Headers
        pageTitle: 'Título da Página',
        views: 'Visualizações',
        users: 'Utilizadores',
        avgTime: 'Tempo Médio',

        // Email Modal
        emailModalTitle: '📧 Configuração de Relatórios',
        emailModalDesc: 'Recebe um resumo semanal das tuas analytics com insights e recomendações.',
        emailAddress: 'Endereço de Email',
        frequency: 'Frequência',
        weekly: 'Semanal (Todas as Segundas)',
        biweekly: 'Quinzenal',
        monthly: 'Mensal',
        emailNote: 'Relatórios por email requerem configuração do EmailJS.',
        signUpFree: 'Regista-te grátis →',
        sendTestEmail: 'Enviar Email Teste',
        saveSettings: 'Guardar Definições',

        // Misc
        loading: 'A carregar dados...',
        dataRefreshed: 'Dados atualizados!',
        noData: 'Sem dados',
        noDataPeriod: 'Sem dados para este período'
    }
};

// Current language - default to Portuguese
let currentLang = localStorage.getItem('dashboardLang') || 'pt';

// Get translation
function t(key) {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;
}

// Switch language
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('dashboardLang', lang);
    updateUILanguage();
}

// Update all UI elements with translations
function updateUILanguage() {
    // Update date buttons
    document.querySelectorAll('.date-btn').forEach(btn => {
        const range = btn.dataset.range;
        if (range === 'today') btn.textContent = t('today');
        if (range === '7days') btn.textContent = t('last7days');
        if (range === '30days') btn.textContent = t('last30days');
        if (range === '90days') btn.textContent = t('last90days');
    });

    // Update connection status
    const statusText = document.querySelector('.status-text');
    if (statusText) {
        const isConnected = document.getElementById('connection-status').classList.contains('connected');
        statusText.textContent = isConnected ? t('connected') : t('demoMode');
    }

    // Update auth button
    const authBtnText = document.querySelector('#auth-btn span');
    if (authBtnText) {
        const isConnected = document.getElementById('connection-status').classList.contains('connected');
        authBtnText.textContent = isConnected ? t('connected') : t('connectGA4');
    }

    // Update metric labels
    const metricLabels = document.querySelectorAll('.metric-label');
    const labelMap = ['totalUsers', 'sessions', 'pageViews', 'bounceRate', 'avgDuration', 'engagementRate'];
    metricLabels.forEach((label, i) => {
        if (labelMap[i]) label.textContent = t(labelMap[i]);
    });

    // Update score section
    const scoreLabel = document.querySelector('.score-label');
    if (scoreLabel) scoreLabel.textContent = t('score');

    const scoreDetailsH3 = document.querySelector('.score-details h3');
    if (scoreDetailsH3) scoreDetailsH3.textContent = t('performanceScore');

    // Update action buttons
    const emailBtnText = document.querySelector('#email-settings-btn span');
    if (emailBtnText) emailBtnText.textContent = t('emailReports');

    const refreshBtnText = document.querySelector('#refresh-btn span');
    if (refreshBtnText) refreshBtnText.textContent = t('refreshData');

    // Update insights section
    const insightsHeader = document.querySelector('.insights-section .section-header h2');
    if (insightsHeader) insightsHeader.textContent = t('insightsTitle');

    const aiBadge = document.querySelector('.insights-section .badge');
    if (aiBadge) aiBadge.textContent = t('aiPowered');

    // Update chart headers
    const chartHeaders = [
        { selector: '.charts-row .chart-card.large h3', key: 'usersOverTime' },
        { selector: '.charts-row .chart-card:not(.large) h3', key: 'trafficSources' },
        { selector: '.tables-row .table-card:first-child h3', key: 'topPages' },
        { selector: '.tables-row .table-card:last-child h3', key: 'deviceBreakdown' }
    ];

    // Update table headers
    const tableHeaders = document.querySelectorAll('#pages-table th');
    const headerKeys = ['pageTitle', 'views', 'users', 'avgTime'];
    tableHeaders.forEach((th, i) => {
        if (headerKeys[i]) th.textContent = t(headerKeys[i]);
    });

    // Update bottom row card headers
    const bottomHeaders = document.querySelectorAll('.bottom-row .card-header h3');
    const bottomKeys = ['browsers', 'topCountries', 'newVsReturning'];
    bottomHeaders.forEach((h3, i) => {
        if (bottomKeys[i]) h3.textContent = t(bottomKeys[i]);
    });

    // Update badges
    const byViewsBadge = document.querySelector('.tables-row .badge');
    if (byViewsBadge) byViewsBadge.textContent = t('byViews');

    const byUsersBadge = document.querySelector('.bottom-row .geography .badge');
    if (byUsersBadge) byUsersBadge.textContent = t('byUsers');

    // Update email modal
    const modalTitle = document.querySelector('.modal-header h3');
    if (modalTitle) modalTitle.textContent = t('emailModalTitle');

    const modalDesc = document.querySelector('.modal-body > p');
    if (modalDesc) modalDesc.textContent = t('emailModalDesc');

    // Update loading text
    const loadingText = document.querySelector('.loading-overlay span');
    if (loadingText) loadingText.textContent = t('loading');

    // Update language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = currentLang === 'pt' ? '🇬🇧 EN' : '🇵🇹 PT';
    }
}
