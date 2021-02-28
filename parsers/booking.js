// www.booking.com

export const URL = 'https://www.booking.com/searchresults.ru.html?aid=397643&label=yan104jc-1FCAEoggI46AdIM1gDaMIBiAEBmAEhuAEHyAEM2AEB6AEB-AEMiAIBqAIDuAKbofCBBsACAdICJDkzYTc3ZjFlLWI4OGYtNGExNi1iODU5LTA1ZGY1MDc1MWU0Y9gCBuACAQ&sid=f1fbdb0f77eb7dd6441d370a2b0de27e&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.ru.html%3Faid%3D397643%3Blabel%3Dyan104jc-1FCAEoggI46AdIM1gDaMIBiAEBmAEhuAEHyAEM2AEB6AEB-AEMiAIBqAIDuAKbofCBBsACAdICJDkzYTc3ZjFlLWI4OGYtNGExNi1iODU5LTA1ZGY1MDc1MWU0Y9gCBuACAQ%3Bsid%3Df1fbdb0f77eb7dd6441d370a2b0de27e%3Bsb_price_type%3Dtotal%3Bsrpvid%3D7d209ac89516013c%26%3B&ss=Калуга&is_ski_area=0&ssne=Калуга&ssne_untouched=Калуга&dest_id=-2919283&dest_type=city&checkin_year=2021&checkin_month=3&checkin_monthday=4&checkout_year=2021&checkout_month=3&checkout_monthday=20&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1';

export const parser = () => {
    let hotels = [];
    // get the hotel elements
    let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
    // get the hotel data
    hotelsElms.forEach((hotelelement) => {
        let hotelJson = {};
        try {
            hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
            hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
            hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
            if(hotelelement.querySelector('strong.price')){
                hotelJson.price = hotelelement.querySelector('strong.price').innerText;
            }
        }
        catch (exception){

        }
        hotels.push(hotelJson);
    });
    return hotels;
}
