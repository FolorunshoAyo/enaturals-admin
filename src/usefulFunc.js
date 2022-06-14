export const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

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

export const capitalizeFirstLetterOfWord = (word) => {
    return word[0].toUpperCase();
};

export function capitalizeWords(arr) {
    return arr.map(element => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    });
}

export const commaListed = (listItems) => {
    let result = "";

    listItems.forEach((item) => {
        if(listItems.length === 1){
            result = listItems.toString();
        }else if(listItems[listItems.length - 1] === item){
            result += `${item}.`;
        }else{
            result += `${item}, `
        }
    });

    return result;
}