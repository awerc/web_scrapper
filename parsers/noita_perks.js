// noita.gamepedia.com

export const URL = 'https://noita.fandom.com/wiki/Perks';

export const parser = () => {
    const processPerks = (rows) => {
        const result = [];
        rows.forEach((perk) => {
            const perkData = {};
            try {
                perkData.img = perk.querySelector('td:nth-child(1) img').src;
                perkData.name = perk.querySelector('td:nth-child(2)').innerText;
                perkData.message = perk.querySelector('td:nth-child(3)').innerText;
                perkData.notes = perk.querySelector('td:nth-child(4)').innerText;
            } catch (e) {}

            if (perkData.name) {
                result.push(perkData);
            }
        });

        return result;
    };

    const normalPerksRows = document.querySelectorAll('.wikitable--normal-perks')[0].querySelectorAll('tbody > tr');

    return processPerks(normalPerksRows);
};
