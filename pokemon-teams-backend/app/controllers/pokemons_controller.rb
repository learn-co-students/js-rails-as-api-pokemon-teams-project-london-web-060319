require 'faker'

class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        render json: pokemons.to_json(:except => [:created_at, :updated_at])
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon.to_json(:except => [:created_at, :updated_at])
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon.to_json(:except => [:created_at, :updated_at])
    end

    def create
        if Pokemon.where(trainer_id: params[:trainer_id]).count < 6
            pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
            render json: pokemon.to_json(:except => [:created_at, :updated_at])
        else
            render :nothing => true, :status => :bad_request
        end
    end

    private

    def pokemon_params
      params.permit(:species, :nickname, :trainer_id)
    end

end
