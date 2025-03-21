export async function fetchIt(url) {
    try {
        let promise = fetch(url).then(res => res.json());
        let result = await Promise.resolve(promise);
        return result;
    } catch (err) {
        console.log("Error: ", err);
        return null;
    }
}