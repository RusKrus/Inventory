export const getUaToUsdRate = async () => {
    try{
        const responseJson = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`); 
        if (responseJson.ok){
            const response = await responseJson.json();
            return response.rates.UAH;
        }
        else{
            console.error('Response done with misake');
            console.log(responseJson);
            throw new Error;
        }
    }
    catch(error){
        console.error(error);
        throw new Error;
    };
};