// noita.gamepedia.com

export const URL = 'https://noita.gamepedia.com/Perks';

export const parser = () => {
    const processPerks = (rows) => {
        let result = [];
        rows.forEach((perk) => {
            let perkData = {};
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

    let normalPerksRows = document.querySelectorAll('.wikitable--normal-perks')[0].querySelectorAll('tbody > tr');
    let betaPerksRows = document.querySelectorAll('.wikitable--normal-perks')[1].querySelectorAll('tbody > tr');

    const normalPerks = processPerks(normalPerksRows);
    const betaPerks = processPerks(betaPerksRows);

    return { normalPerks, betaPerks };
};
