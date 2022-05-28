export const parseCategories = (categories) => {
   return categories.map(category => {
        return category.name;
    });
}

export const captitalizeFirstLetterOfEachWord = (sentence) => {
    const words = sentence.split(" ");

    return (words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" "));
};