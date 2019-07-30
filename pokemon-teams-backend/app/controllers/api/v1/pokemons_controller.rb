class Api::V1::PokemonsController < ApplicationController
    before_action :set_pokemon, only: [:show, :update, :destroy]
    def index
        pokemons = Pokemon.all
        options = {
            include: [:trainer]
        }
        render json: Api::V1::PokemonSerializer.new(pokemons, options)
    end

    def create
        Pokemon.random_pokemon(params[:trainer_id])
    end

    def destroy
        @pokemon.destroy
    end

    private

    def set_pokemon
        @pokemon = Pokemon.find(params[:id])
    end
end
