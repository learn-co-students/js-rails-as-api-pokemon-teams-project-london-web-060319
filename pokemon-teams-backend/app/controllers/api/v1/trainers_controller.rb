class Api::V1::TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        options = {
            include: [:pokemons]
        }
        render json: Api::V1::TrainerSerializer.new(trainers, options)
    end
end
