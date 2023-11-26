const axios = require('axios');
const cheerio = require('cheerio');
const cookies = 'MUID= 39A5494F35E26B030B3A5A9A343B6A8C; uaid= T03sQgsPNRu1ctXAyOdv_u1GipFjZACC1KSnE2B0tVJpYmaKkpVSaZV7kKtxire_hY9hpn9yiYd_cFC2ZZ5hZKBLiFItAwA.'

async function getProductData(product_id) {
    const url = `https://www.etsy.com/listing/${product_id}`;
    console.log(url)
    // "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
    try {
        // Send an HTTP request to the URL
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                'accept-language': "vi",
                'cache-control': "max-age=0",
                "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
            }
        });

        if (response.status === 200) {
            // Load HTML content into Cheerio
            const $ = cheerio.load(response.data);

            // Extract product information
            const productTitle = $('h1').text().trim();
            const productPrice = $('.wt-text-title-largest').text().trim();

            // Add more fields as needed

            // Print or store the data as per your requirement
            console.log(`Product ID: ${product_id}`);
            console.log(`Title: ${productTitle}`);
            console.log(`Price: ${productPrice}`);
            console.log('\n');
        } else {
            console.error(`Failed to retrieve data for product ID ${product_id}. Status code: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error fetching data for product ID ${product_id}: ${error.message}`);
    }
}

// Example usage
const productIds = ['1556284565/personalized-audio-engineer-christmas'];  // Replace these with the actual product IDs you want to crawl
async function crawlEtsy() {
    for (const productId of productIds) {
        await getProductData(productId);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

crawlEtsy();