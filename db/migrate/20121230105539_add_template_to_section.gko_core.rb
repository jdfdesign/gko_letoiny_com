# This migration comes from gko_core (originally 20121230114700)
class AddTemplateToSection < ActiveRecord::Migration
  def up
    add_column :sections, :template, :string unless column_exists?(:sections, :template)
    Site.all.each do |site|
      site.sections.all.each do |section|
        section.template = section.layout
        section.layout = ''
        section.save
      end
    end
  end

  def down
    remove_column :sections, :template if column_exists?(:sections, :template)
  end
end