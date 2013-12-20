class TableBookingsController < ApplicationController
  
  respond_to :js
  
  def new 
    @table_booking = TableBooking.new
    @table_booking.set_default_values if Rails.env.development? 
  end 
  
  def create 
    begin 
      @table_booking = TableBooking.new(params[:table_booking])
      @table_booking.request = request 
      if @table_booking.deliver
        flash.now[:notice] = 'Thank you for your message!' 
      else 
        render :new 
      end 
    rescue ScriptError 
      flash[:error] = 'Sorry, this message appears to be spam and was not delivered.' 
    end 
  end
  
end