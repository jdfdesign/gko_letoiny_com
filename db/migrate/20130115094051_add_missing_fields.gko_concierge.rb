# This migration comes from gko_concierge (originally 20130115052800)
class AddMissingFields < ActiveRecord::Migration
  def change
    add_column :table_reservations, :lunch, :boolean, :default => false unless column_exists?(:table_reservations, :lunch)
    add_column :table_reservations, :restaurant_name, :string, :null => false unless column_exists?(:table_reservations, :restaurant_name)
    add_column :hotel_reservations, :food_comments, :text unless column_exists?(:hotel_reservations, :food_comments)
    add_column :spa_reservations, :start_time, :time unless column_exists?(:spa_reservations, :start_time)

    unless table_exists?(:baby_sitter_bookings)
      create_table :baby_sitter_bookings do |t|
        t.integer :hotel_reservation_id
        t.datetime :book_date
        t.integer :children, :default => 1
        t.string :duration
        t.time :start_time
        t.timestamps
      end
      
      add_index :baby_sitter_bookings, :hotel_reservation_id
    end

  end
end
