window.Auth = (function () {
    const SESSION_KEY = 'cotolar_session';

    function setSession(user) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }

    function getSession() {
        const s = sessionStorage.getItem(SESSION_KEY);
        return s ? JSON.parse(s) : null;
    }

    function updateSession(data) {
        const current = getSession();
        if (current) setSession({ ...current, ...data });
    }

    function logout() {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = '/pages/home/';
    }

    function requireAuth(roles) {
        const user = getSession();
        if (!user) {
            window.location.href = '/pages/login/';
            return null;
        }
        if (roles && roles.length && !roles.includes(user.rol)) {
            window.location.href = '/pages/home/';
            return null;
        }
        return user;
    }

    function redirectByRole(user) {
        if (user.rol === 'admin' || user.rol === 'encargado') {
            window.location.href = '/pages/admin/';
        } else if (user.rol === 'docente') {
            window.location.href = '/pages/teacher/';
        } else {
            window.location.href = '/pages/home/';
        }
    }

    return { setSession, getSession, updateSession, logout, requireAuth, redirectByRole };
})();
