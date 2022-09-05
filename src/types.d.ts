interface Window {
    $json: any;
}

interface GlobalState {
    Auth: AuthData | null,
    CountCartItem: number,
    CountNotification: number,
    showChatBar: boolean,
    hasAuthTemp: boolean,
    showChatBox: boolean,
}

interface AuthData {
    token: string,
    user: {
        id: number,
        address: string | null,
        name: string | null,
        email: string
    }
}

