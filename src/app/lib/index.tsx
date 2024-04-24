export const parseLink = (url: string)=> {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    const res: {
        [KEY: string]: string
    } = {};
    let match: RegExpExecArray;
    while ((match = regex.exec(url)) !== null) {
        res[match[1]] = decodeURIComponent(match[2]);
    }
    return res;
}
export const parseDeepLink = (url: string) => {
    let params = {...parseLink(url)};
    if (params["link"]){
        params = {...params, ...parseLink(params["link"])};
        console.log(params);
    }
    return params;
}
