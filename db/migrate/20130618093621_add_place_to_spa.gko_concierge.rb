# This migration comes from gko_concierge (originally 20130618113400)
class AddPlaceToSpa < ActiveRecord::Migration
  def up
    add_column :spa_reservations, :place, :string, :limit => 30
  end
end