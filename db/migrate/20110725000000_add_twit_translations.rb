class AddTwitTranslations < ActiveRecord::Migration
  def self.up
    Twit.create_translation_table! :body => :text
  end

  def self.down
    Twit.drop_translation_table
  end
end