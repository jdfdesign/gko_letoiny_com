class GkoTwitsCreateTables < ActiveRecord::Migration
  def self.up
    create_table :twits do |t|
      t.integer :account_id
      t.integer :author_id
      t.integer :section_id
      t.integer :site_id
      t.string :body
      t.date :published_at
      t.date :expire_at
      t.timestamps
    end
    add_index :twits, :site_id
    add_index :twits, :section_id
    add_index :twits, :account_id
    add_index :twits, :author_id
  end

  def self.down
    drop_table :twits
  end
end