Rails.application.routes.draw do
  resources :info_forms, :format => :js
  resources :table_bookings, :format => :js
end

