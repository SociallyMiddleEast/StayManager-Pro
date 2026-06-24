/* ══════════ APP ══════════ */
const App = () => {
    const [res, setResRaw] = useLS('sm_res', seedRes);
    const [rooms, setRoomsRaw] = useLS('sm_rooms', seedRooms);
    const [users, setUsersRaw] = useLS('sm_users', seedUsers);
    const [sheetsUrl, setSheetsUrlRaw] = useLS('sm_sheetsUrl', () => '');
    const [theme, setThemeRaw] = useLS('sm_theme', () => 'light');
    const [currentUser, setCurrentUser] = useState(null);
    const [page, setPage] = useState('dashboard');
    const [syncState, setSyncState] = useState('idle');
    const [syncLog, setSyncLog] = useState([]);
    const [newResOpen, setNewResOpen] = useState(false);
    const [dbLoading, setDbLoading] = useState(false);

    // ── On startup: if a sheetsUrl is saved, load all data from Sheets ──
    useEffect(() => {
        if (!sheetsUrl) return;
        setDbLoading(true);
        Promise.all([
            SheetsAPI.getReservations(sheetsUrl),
            SheetsAPI.getRooms(sheetsUrl),
            SheetsAPI.getUsers(sheetsUrl),
        ]).then(([rRes, rRooms, rUsers]) => {
            if (rRes.success && Array.isArray(rRes.data) && rRes.data.length > 0)
                setResRaw(rRes.data);
            if (rRooms.success && Array.isArray(rRooms.data) && rRooms.data.length > 0)
                setRoomsRaw(rRooms.data);
            if (rUsers.success && Array.isArray(rUsers.data) && rUsers.data.length > 0)
                setUsersRaw(rUsers.data);
            addSyncLog('ok', 'Loaded data from database');
        }).catch(e => {
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
    const addSyncLog = (type, msg, detail = '') => {
        const entry = { type, msg, detail, time: new Date().toLocaleTimeString() };
        setSyncLog(prev => [entry, ...prev].slice(0, 50));
    };

    const dbConnected = !!sheetsUrl;
    const ctx = { sheetsUrl, setSheetsUrl, syncState, syncLog, addSyncLog, setCurrentUser };

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

    if (dbLoading) return (
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 14, color: 'var(--txt2)', fontFamily: 'var(--fs)' } },
            React.createElement(Ic, { n: 'cloud', sz: 32, style: { color: 'var(--gold)' } }),
            React.createElement('p', { style: { fontSize: 15 } }, 'Connecting to database…'))
    );

    if (!currentUser) return (
        React.createElement(AppCtx.Provider, { value: ctx },
            React.createElement(Login, { users: users }))
    );

    return (
        React.createElement(AppCtx.Provider, { value: ctx },
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
                        React.createElement('div', { className: 'sync-pill', title: dbConnected ? `Connected: ${sheetsUrl}` : 'Not connected' },
                            React.createElement('span', { className: `sync-dot ${dbConnected ? 'on' : 'off'}` }),
                            dbConnected ? 'Database Connected' : 'Local Mode'),
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
                    if (sheetsUrl) {
                        try {
                            const result = await SheetsAPI.saveReservation(sheetsUrl, r);
                            addSyncLog(result.success ? 'ok' : 'error', `Saved reservation ${r.id}`, result.error);
                        } catch (e) { addSyncLog('error', 'Sync failed', e.message); }
                    }
                },
                onClose: () => setNewResOpen(false), initial: null
            })));
};

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
