class Api::V1::TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
  has_many :pokemons
end
