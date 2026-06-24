/* ══════════ NO-DB BLOCKER ══════════ */
const NoDbBlocker = () => {
    const wa = 'https://wa.me/96170234138?text=Hi%2C%20I%20need%20help%20connecting%20StayManager%20Pro%20to%20the%20database.';
    return (
        React.createElement('div', { style: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 } },
            React.createElement('div', { style: { background: 'var(--surf)', borderRadius: 'var(--rlg)', padding: 36, maxWidth: 440, width: '100%', border: '1px solid var(--brd)', textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' } },
                React.createElement('div', { style: { width: 64, height: 64, borderRadius: '50%', background: 'rgba(220,38,38,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' } },
                    React.createElement(Ic, { n: 'db', sz: 28, style: { color: '#DC2626' } })),
                React.createElement('h2', { style: { fontFamily: 'var(--fd)', fontSize: 22, fontWeight: 700, color: 'var(--txt)', marginBottom: 10 } }, 'No Database Connection'),
                React.createElement('p', { style: { fontSize: 14, color: 'var(--txt2)', lineHeight: 1.75, marginBottom: 8 } },
                    'StayManager Pro requires a live database connection to operate. You are currently in offline mode — ',
                    React.createElement('strong', { style: { color: '#DC2626' } }, 'any data entered will not be saved and will be lost.')),
                React.createElement('p', { style: { fontSize: 13, color: 'var(--txt3)', lineHeight: 1.7, marginBottom: 24 } },
                    'Please contact support to set up or restore your database connection before using the application.'),
                React.createElement('div', { style: { background: 'var(--surf2)', borderRadius: 'var(--rsm)', padding: '14px 18px', marginBottom: 24, border: '1px solid var(--brd)' } },
                    React.createElement('p', { style: { fontSize: 12, color: 'var(--txt3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 } }, 'Support Contact'),
                    React.createElement('p', { style: { fontFamily: 'var(--fd)', fontSize: 17, fontWeight: 700, color: 'var(--txt)' } }, 'SociallyMiddleEast'),
                    React.createElement('p', { style: { fontSize: 14, color: 'var(--txt2)', marginTop: 2 } }, '+961 70 234 138')),
                React.createElement('a', {
                    href: wa, target: '_blank', rel: 'noopener noreferrer',
                    style: { display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', border: 'none', borderRadius: 'var(--rsm)', padding: '12px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'none', justifyContent: 'center', width: '100%' }
                },
                    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor' },
                        React.createElement('path', { d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' })),
                    'Chat on WhatsApp'))));
};

/* ══════════ APP ══════════ */
const App = () => {
    const [res, setResRaw] = useLS('sm_res', seedRes);
    const [rooms, setRoomsRaw] = useLS('sm_rooms', seedRooms);
    const [users, setUsersRaw] = useLS('sm_users', seedUsers);
    const [sheetsUrl, setSheetsUrlRaw] = useLS('sm_sheetsUrl', () => '');
    const [theme, setThemeRaw] = useLS('sm_theme', () => 'light');
    const [currentUser, setCurrentUser] = useState(null);
    const [page, setPage] = useState('dashboard');
    const [syncLog, setSyncLog] = useState([]);
    const [newResOpen, setNewResOpen] = useState(false);
    const [dbLoading, setDbLoading] = useState(false);
    const [dbReady, setDbReady] = useState(false);
    const [showBlocker, setShowBlocker] = useState(false);

    const addSyncLog = (type, msg, detail = '') => {
        const entry = { type, msg, detail, time: new Date().toLocaleTimeString() };
        setSyncLog(prev => [entry, ...prev].slice(0, 50));
    };

    // ── On startup or whenever sheetsUrl changes: load from DB ──
    useEffect(() => {
        if (!sheetsUrl) {
            setDbReady(false);
            return;
        }
        setDbLoading(true);
        Promise.all([
            SheetsAPI.getReservations(sheetsUrl),
            SheetsAPI.getRooms(sheetsUrl),
            SheetsAPI.getUsers(sheetsUrl),
        ]).then(([rRes, rRooms, rUsers]) => {
            if (rRes.success && Array.isArray(rRes.data) && rRes.data.length > 0) setResRaw(rRes.data);
            if (rRooms.success && Array.isArray(rRooms.data) && rRooms.data.length > 0) setRoomsRaw(rRooms.data);
            if (rUsers.success && Array.isArray(rUsers.data) && rUsers.data.length > 0) setUsersRaw(rUsers.data);
            setDbReady(true);
            addSyncLog('ok', 'Loaded data from database');
        }).catch(e => {
            setDbReady(false);
            addSyncLog('error', 'Failed to load from database', e.message);
        }).finally(() => setDbLoading(false));
    }, [sheetsUrl]);

    // Apply theme
    useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

    const setRes = v => setResRaw(v);
    const setRooms = v => setRoomsRaw(v);
    const setUsers = v => setUsersRaw(v);
    const setSheetsUrl = v => setSheetsUrlRaw(v);
    const toggleTheme = () => setThemeRaw(theme === 'dark' ? 'light' : 'dark');

    // Guard: any action attempted without DB shows blocker
    const guardAction = (fn) => (...args) => {
        if (!dbReady) { setShowBlocker(true); return; }
        return fn(...args);
    };

    const ctx = { sheetsUrl, setSheetsUrl, syncState: 'idle', syncLog, addSyncLog, setCurrentUser, dbReady, guardAction };

    const NAV = [
        { id: 'dashboard', label: 'Dashboard', icon: 'home' },
        { id: 'schedule', label: 'Schedule', icon: 'calendar' },
        { id: 'reservations', label: 'Reservations', icon: 'list',
            badge: res.filter(r => r.checkIn === toDay() && !['checkedin','checkedout','cancelled'].includes(r.status)).length || null },
        { id: 'checkin', label: 'Check In', icon: 'login',
            badge: res.filter(r => r.checkIn === toDay() && !['checkedin','checkedout','cancelled'].includes(r.status)).length || null },
        { id: 'checkout', label: 'Check Out', icon: 'logout',
            badge: res.filter(r => r.checkOut === toDay() && r.status === 'checkedin').length || null },
        { id: 'reports', label: 'Reports', icon: 'chart' },
        { id: 'history', label: 'Guest History', icon: 'history' },
        { id: 'settings', label: 'Settings', icon: 'cog' },
    ];
    const PAGE_TITLES = {
        dashboard: 'Dashboard', schedule: 'Schedule', reservations: 'Reservations',
        checkin: 'Check In', checkout: 'Check Out', reports: 'Reports',
        history: 'Guest History', settings: 'Settings'
    };

    // ── Loading screen ──
    if (dbLoading) return (
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 16, color: 'var(--txt2)', fontFamily: 'var(--fs)', background: 'var(--bg)' } },
            React.createElement('div', { style: { width: 56, height: 56, borderRadius: '50%', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 } },
                React.createElement(Ic, { n: 'cloud', sz: 28, style: { color: 'var(--gold)' } })),
            React.createElement('p', { style: { fontFamily: 'var(--fd)', fontSize: 18, fontWeight: 600, color: 'var(--txt)' } }, 'Connecting to database…'),
            React.createElement('p', { style: { fontSize: 13, color: 'var(--txt3)' } }, 'Loading your property data, please wait'))
    );

    // ── No DB: show lock screen ──
    if (!sheetsUrl || !dbReady) return (
        React.createElement(AppCtx.Provider, { value: ctx },
            React.createElement('div', { style: { minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 } },
                React.createElement(NoDbBlocker, null)))
    );

    if (!currentUser) return (
        React.createElement(AppCtx.Provider, { value: ctx },
            React.createElement(Login, { users: users }))
    );

    return (
        React.createElement(AppCtx.Provider, { value: ctx },
            showBlocker && React.createElement(NoDbBlocker, { onClose: () => setShowBlocker(false) }),
            React.createElement('aside', { className: 'sb' },
                React.createElement('div', { className: 'sb-logo' },
                    React.createElement('div', { className: 'sb-logo-mark' },
                        React.createElement('div', { className: 'sb-logo-icon' },
                            React.createElement(Ic, { n: 'building', sz: 18, style: { color: '#fff' } })),
                        React.createElement('h1', null, 'StayManager')),
                    React.createElement('span', null, 'Pro Edition')),
                React.createElement('div', { className: 'sb-sec' }, 'Main'),
                React.createElement('nav', { className: 'sb-nav' },
                    NAV.slice(0, 5).map(n => (
                        React.createElement('button', { key: n.id, className: `ni${page === n.id ? ' on' : ''}`, onClick: () => setPage(n.id) },
                            React.createElement('span', { className: 'ni-icon' }, React.createElement(Ic, { n: n.icon, sz: 17 })),
                            n.label,
                            !!n.badge && React.createElement('span', { className: 'ni-bdg', style: { background: page === n.id ? 'rgba(201,168,76,.25)' : 'rgba(255,255,255,.12)', color: page === n.id ? 'var(--gold)' : 'rgba(255,255,255,.6)' } }, n.badge))
                    )),
                    React.createElement('div', { className: 'sb-sec', style: { padding: '18px 4px 5px' } }, 'Analytics & Settings'),
                    NAV.slice(5).map(n => (
                        React.createElement('button', { key: n.id, className: `ni${page === n.id ? ' on' : ''}`, onClick: () => setPage(n.id) },
                            React.createElement('span', { className: 'ni-icon' }, React.createElement(Ic, { n: n.icon, sz: 17 })),
                            n.label)
                    ))),
                React.createElement('div', { className: 'sb-footer' },
                    React.createElement('div', { className: 'sb-user' },
                        React.createElement('div', { className: 'sb-ava' }, ini(currentUser.name)),
                        React.createElement('div', { className: 'sb-uinfo' },
                            React.createElement('p', null, currentUser.name),
                            React.createElement('span', null, currentUser.role))),
                    React.createElement('button', { className: 'ni', onClick: () => setCurrentUser(null), style: { width: '100%' } },
                        React.createElement('span', { className: 'ni-icon' }, React.createElement(Ic, { n: 'logout', sz: 17 })),
                        'Sign Out'))),
            React.createElement('div', { className: 'main' },
                React.createElement('header', { className: 'topbar' },
                    React.createElement('span', { className: 'tb-title' }, PAGE_TITLES[page]),
                    React.createElement('div', { className: 'tb-right' },
                        React.createElement('div', { className: 'sync-pill', style: { background: 'rgba(37,211,102,0.12)', color: '#16A34A' } },
                            React.createElement('span', { className: 'sync-dot on' }),
                            'Database Connected'),
                        React.createElement('button', { className: 'ib', onClick: toggleTheme, title: 'Toggle theme' },
                            React.createElement(Ic, { n: theme === 'dark' ? 'sun' : 'moon', sz: 16 })))),
                React.createElement('main', { className: 'pg' },
                    page === 'dashboard' && React.createElement(Dashboard, { res: res, rooms: rooms, onNewRes: () => setNewResOpen(true) }),
                    page === 'schedule' && React.createElement(Schedule, { res: res, onNew: () => setNewResOpen(true) }),
                    page === 'reservations' && React.createElement(ResList, { res: res, setRes: setRes, rooms: rooms }),
                    page === 'checkin' && React.createElement(CheckIn, { res: res, setRes: setRes }),
                    page === 'checkout' && React.createElement(CheckOut, { res: res, setRes: setRes }),
                    page === 'reports' && React.createElement(Reports, { res: res }),
                    page === 'history' && React.createElement(GuestHistory, { res: res }),
                    page === 'settings' && React.createElement(SettingsPage, { users: users, setUsers: setUsers, rooms: rooms, setRooms: setRooms }))),
            newResOpen && React.createElement(ResForm, {
                allRes: res, rooms: rooms,
                onSave: async (r) => {
                    const updated = [...res, r];
                    setRes(updated);
                    setNewResOpen(false);
                    try {
                        const result = await SheetsAPI.saveReservation(sheetsUrl, r);
                        addSyncLog(result.success ? 'ok' : 'error', `Saved reservation ${r.id}`, result.error);
                    } catch (e) { addSyncLog('error', 'Sync failed', e.message); }
                },
                onClose: () => setNewResOpen(false), initial: null
            })));
};

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
