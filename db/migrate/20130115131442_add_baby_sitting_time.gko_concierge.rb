# This migration comes from gko_concierge (originally 20130115052900)
class AddBabySittingTime < ActiveRecord::Migration
  def change
    add_column :baby_sitter_bookings, :start_time, :time, :default => false unless column_exists?(:baby_sitter_bookings, :start_time)
  end
end
