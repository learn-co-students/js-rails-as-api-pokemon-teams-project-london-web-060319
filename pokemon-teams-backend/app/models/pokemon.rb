class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.random_pokemon(trainer_id)
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
  end
end
