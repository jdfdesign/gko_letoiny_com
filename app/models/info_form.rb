class InfoForm < MailForm::Base
  
  attribute :site_id
  attribute :first_name, :validate => true
  attribute :last_name, :validate => true
  attribute :email, :validate => true, :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :phone, :validate => true
  attribute :subject
  attribute :message
  attribute :nickname, :captcha => true
  
  #validates :email, :presence => true, :email => true
  
  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.
  def headers
    {
      :subject => "Demande d'informations",
      :to => Site.current.inquiry_recipients || Site.current.preferred_contact_email,
      :from => %("#{first_name} #{last_name}" <#{email}>)
    }
  end

  def name
    "#{first_name} #{last_name}"
  end
  
  def to_s
    "#{name}<br/>#{subject}<br/>#{message}"
  end
  
end