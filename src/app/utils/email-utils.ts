export class EmailUtils {
    static validEmail(val: string) {
        if (val && val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return true;
        }
        return false;
    }
}