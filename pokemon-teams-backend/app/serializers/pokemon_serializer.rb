class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :species, :trainer_id
end
