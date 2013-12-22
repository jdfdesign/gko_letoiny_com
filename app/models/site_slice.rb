Site.class_eval do
  has_many :hotel_bookings, :dependent => :destroy
  has_many :table_bookings, :dependent => :destroy
  has_option :table_inquiry_recipients, :default => "contact@joufdesign.com", :type => :string

  before_validation do |r|
    #Remove all white space if any
    r.table_inquiry_recipients = r.table_inquiry_recipients.split(',').compact.collect { |x| x.gsub(/\s+/, "") }.join(',')
  end
end