# This migration comes from gko_twits (originally 20120812105200)
class RemoveAuthorFromTwits < ActiveRecord::Migration
  def up
    remove_column :twits, :author_id if column_exists?(:twits, :author_id)
  end

  def down
    add_column :twits, :author_id, :integer unless column_exists?(:twits, :author_id)
  end
end