source 'https://rubygems.org'

group :assets do
  gem 'sass', '= 3.2.14'
  gem 'sass-rails', '~> 3.2.6'
  gem 'uglifier', '~> 2.4.0'
end

#gem 'tins', '~> 1.0.0'
gem 'bcrypt', '= 3.1.10'
gem 'mysql2', '= 0.3.20'
gem 'rmagick', '= 2.15.4'
group :production do
  git "git@github.com:jdfdesign/gko_cms3.git", :tag => "v0.8.31" do
   gem 'gko_core'
   gem 'gko_auth'
   gem "gko_documents"
   gem 'gko_inquiries'
   gem 'gko_blog'
   gem 'gko_twits'
   gem 'gko_categories'
   gem 'gko_stickers'
   gem 'gko_features'
   gem 'gko_image_bank'
  end
end

# group :development do
#  gem "gko_core", :path => '~/Github/gko_cms3/gko_core'
#  gem "gko_auth", :path => '~/Github/gko_cms3/gko_auth'
#  gem "gko_documents", :path => '~/Github/gko_cms3/gko_documents'
#  gem "gko_inquiries", :path => '~/Github/gko_cms3/gko_inquiries'
#  gem "gko_blog", :path => '~/Github/gko_cms3/gko_blog'
#  gem "gko_twits", :path => '~/Github/gko_cms3/gko_twits'
#  gem "gko_categories", :path => '~/Github/gko_cms3/gko_categories'
#  gem "gko_stickers", :path => '~/Github/gko_cms3/gko_stickers'
#  gem "gko_image_bank", :path => '~/Github/gko_cms3/gko_image_bank'
#  gem "gko_features", :path => '~/Github/gko_cms3/gko_features'
# end
