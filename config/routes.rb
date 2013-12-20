Rails.application.routes.draw do
  resources :hotel_bookings, :format => :js
  resources :table_bookings, :format => :js
end

