import axios  from 'axios';

export async function PhonebookReversesearch(number, method) {
    if (method === "11880.com") {
        const response = await axios.get(`https://www.11880.com/suche/${number}/deutschland`);
        let data = response.data;
        let match = data.match("<li\s+[^>]*class=\"search-result-list-item\"\s+[^>]*data-name=\"([^\"]+)");
        if (match && match.length >= 2) {
            return match[1];
        }
        match = data.match("<h\d [^>]*itemprop=\"name\"[^>]*>([^<]+)</h\d>");
        if (match && match.length >= 2) {
            return match[1];
        }
    } else {
        const response = await axios.get(`https://dasoertliche.de/?form_name=search_inv&ph=${number}`);
        let data = response.data;
        let match = data.match("<a href=\"[^\"]*form_name=detail[^\"]*\".+?class=\"name \".+?><span class=\"\">(.+?)</span>");
        if (match && match.length >= 2) {
            return match[1];
        }
    }

    return "";
}