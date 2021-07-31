// gamewith.net

export const URL = 'https://gamewith.net/genshin-impact/article/show/22403';

export const parser = () => {
    const processFood = (rows) => {
        const result = [];
        rows.forEach((food) => {
            const foodData = {};
            try {
                foodData.img = food.querySelector('th:nth-child(1) img').dataset.original;
                const title = food.querySelector('th:nth-child(1)').innerText;
                [foodData.stars, foodData.name] = title.split('\n');
                const content = food.querySelector('td:nth-child(2)').innerText;
                const [ingredients, where, effect] = content
                    .replace(/(ingredients:\n)|(how to get:\n)|(effect:\n)/gi, 'splitter')
                    .split('splitter')
                    .filter(Boolean);
                foodData.ingredients = ingredients
                    .split('\n')
                    .map((e) => e.replace('-', '').trim())
                    .filter(Boolean);
                foodData.where = where.replace('\n', '');
                foodData.effect = effect.replace('\n', '');
            } catch (e) {}

            if (foodData.name) {
                result.push(foodData);
            }
        });

        return result;
    };

    const foodRows = document.querySelectorAll('.w-instant-database-list tbody > tr');

    return processFood(foodRows);
};
