# This migration comes from gko_concierge (originally 20120618104000)
class AddServiceToTableReservation < ActiveRecord::Migration
  def up
    add_column :table_reservations, :service, :string, :limit => 10 unless column_exists?(:table_reservations, :service)
    remove_column :table_reservations, :lunch if column_exists?(:table_reservations, :lunch)
  end
end
