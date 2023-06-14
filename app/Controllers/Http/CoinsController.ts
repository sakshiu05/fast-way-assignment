import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Coin from 'App/Models/Coin';
import axios from 'axios';

export default class CoinsController {
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

  public async store({ response }: HttpContextContract) {
    try {
      // getting data from coinGecko api it may take upto few seconds via axios
      const curlResponse = await axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=true', { headers: { accept: 'application/json' } });
      const createCoin = await Coin.createMany(curlResponse.data);
      if (!createCoin){
        return response.status(500).send({ message: 'Something went wrong while entering the data'});
      } else return response.status(200).send({ message: 'Data entered successfully', data: createCoin });
    } catch (error) {
      return response.status(400).send({message : error.message});
    }
  }

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


