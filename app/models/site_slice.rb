Site.class_eval do
  has_many :hotel_bookings, :dependent => :destroy
  has_many :table_bookings, :dependent => :destroy
  has_option :hotel_booking_recipients, :default => "contact@joufdesign.com", :type => :string
  has_option :table_booking_recipients, :default => "contact@joufdesign.com", :type => :string

  before_validation do |r|
    #Remove all white space if any
    r.hotel_booking_recipients = r.hotel_booking_recipients.split(',').compact.collect { |x| x.gsub(/\s+/, "") }.join(',')
    r.table_booking_recipients = r.table_booking_recipients.split(',').compact.collect { |x| x.gsub(/\s+/, "") }.join(',')
  end
end