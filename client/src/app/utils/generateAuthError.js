export function generetaAuthError(message) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Email or Password incorrect';
        case 'EMAIL_EXISTS':
            return 'User with the same Email already exist';
        default:
            return 'To much requests .Try later';
    }
}
