export async function parseDataAccordingToContentType(response: any) {
    const contentType = response.headers.get("content-type")

    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    }
    else {

        return await response.text();
    }
}