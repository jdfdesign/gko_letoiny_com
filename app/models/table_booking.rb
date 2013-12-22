class TableBooking < MailForm::Base
  
  attribute :site_id
  attribute :first_name, :validate => true
  attribute :last_name, :validate => true
  attribute :email, :validate => true, :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :phone, :validate => true
  attribute :guest_count, :validate => true
  attribute :location, :validate => true
  attribute :day, :validate => true
  attribute :service, :validate => true
  attribute :message
  attribute :nickname, :captcha => true
  
  #validates :email, :presence => true, :email => true
  
  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.
  def headers
    {
      :subject => "Demande de réservation au Gaiac",
      :to => Site.current.table_inquiry_recipients,
      :from => %("#{first_name} #{last_name}" <#{email}>)
    }
  end
  
  def to_s
    "#{first_name} #{last_name}"
  end
  
end