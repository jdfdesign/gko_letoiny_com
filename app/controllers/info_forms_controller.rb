class InfoFormsController < BaseController
  
  respond_to :js
  
  def new 
    @info_form = InfoForm.new
    @info_form.set_default_values if Rails.env.development? 
  end 
  
  def create 
    begin 
      @info_form = InfoForm.new(params[:info_form])
      @info_form.request = request 
      if @info_form.deliver
       # Inquiry.create(:site => Site.current, :email => @info_form.email, :name => @info_form.name, :message => @info_form.to_s)
        flash.now[:notice] = 'Thank you for your message!' 
      else 
        render :new 
      end 
    rescue ScriptError 
      flash[:error] = 'Sorry, this message appears to be spam and was not delivered.' 
    end 
  end
  
end