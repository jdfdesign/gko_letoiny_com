# This migration comes from gko_concierge (originally 20131031152400)
class AddCountryToHotelReservation < ActiveRecord::Migration
  def change
    remove_column :hotel_reservations, :country_id
    add_column :hotel_reservations, :country, :string
    remove_column :hotel_reservations, :state_id
    add_column :hotel_reservations, :state, :string
  end
end
