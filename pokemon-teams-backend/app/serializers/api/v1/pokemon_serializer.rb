class Api::V1::PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :species, :nickname
  belongs_to :trainer
end
