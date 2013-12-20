class TableBooking < MailForm::Base
  
  attributes :site_id
  attributes :first_name, :validate => true
  attributes :last_name, :validate => true
  attributes :email, :validate => true, :email => true
  attributes :phone, :validate => true
  attributes :guest_count, :validate => true
  attributes :location, :validate => true
  attributes :day, :validate => true
  attributes :service, :validate => true
  attributes :other_value
  attributes :message
  attributes :nickname, :captcha => true
  
  #validates :email, :presence => true, :email => true
  
  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.
  def headers
    {
      :subject => "Contact from website",
      :to => Site.current.preferred_contact_email,
      :from => %("#{lastname}" <#{email}>)
    }
  end
  
  def to_s
    "#{first_name} #{last_name}"
  end
  
end