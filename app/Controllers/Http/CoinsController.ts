import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Coin from 'App/Models/Coin';
import axios from 'axios';

export default class CoinsController {
  // For getting the all coins data
  public async index({response}: HttpContextContract) {
    try {
      const coins = await Coin.all();
      if (!coins) {
        return response.status(500).send({ message: 'Something went wrong while entering the data'});
      } else return response.status(200).send({ message: 'Data found successfully', data: coins});;
    } catch(error) {
      return response.status(400).send({ message: error.message});
    }
    
  }

  // For inserting the coin data via coinGecko api
  public async store({ request, response }: HttpContextContract) {
    try {
      // getting data from coinGecko api it may take upto few seconds via axios
      const curlResponse = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true', { headers: { accept: 'application/json' } });
      
      // validation code start
      const coinsData = curlResponse.data;
      const coinSchema = schema.create({
        coinsGechko: schema.array().members(
          schema.object().members({
            id: schema.string({}, [rules.required()]),
            symbol: schema.string.optional(), // Here i have to do this optional as sometime data is empty
            name: schema.string({}, [rules.required()]),
            platforms: schema.object().members({
              // Define platform schema here if needed
            })
          })
        ),
      });
  
      const payload = {
        coinsGechko: coinsData, // Assign coinsData to the coins field
      };
  
      await request.validate({ schema: coinSchema, data: payload });

      const createCoin = await Coin.createMany(payload.coinsGechko);
      
      if (!createCoin){
        return response.status(500).send({ message: 'Something went wrong while entering the data'});
      } else return response.status(200).send({ message: 'Data entered successfully', data: createCoin });
    } catch (error) {
      if (error.messages) {
        // Log validation errors
        console.log(error.messages);
      }
      return response.status(400).send({message : error.message});
    }
  }

  // For getting single coin data via id
  public async show({ params, response }: HttpContextContract) {
    try{
      const coin = await Coin.find(params.id);
      if (!coin){
        return response.status(404).send({ message: 'Data not found'});
      } else return response.status(200).send({ message: 'Data found successfully', data: coin});
    }catch (error){
      return response.status(400).send({ message: error.message});
    }
  } 

}


