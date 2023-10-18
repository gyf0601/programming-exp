class CookieManager {
    setCookie(name: string, value: string, days: number) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);

        document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    }

    getCookie(name: string): string | null {
        const cookieName = `${name}=`;
        const cookies = document.cookie.split(";");

        for (const cookie of cookies) {
            let trimmedCookie = cookie.trim();
            if (trimmedCookie.startsWith(cookieName)) {
                return trimmedCookie.substring(cookieName.length);
            }
        }

        return null;
    }

    deleteCookie(name: string) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
}

export default new CookieManager();
