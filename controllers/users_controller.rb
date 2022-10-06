class UsersController < ApplicationController
    before_action :set_user, only: %i[ show update destroy ]
    skip_before_action :verify_authenticity_token
    
    def index
        user = User.all
        render json: user
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def login
    user = User.find_by(username: params[:username]).try(:authenticate, params[:password])

        if user 
            token = encode(user.id)
        
            render json: {user: user, token: token}
        else
            render json: { message: 'wrong'}
        end
        # render json: user
    end

    # get profile
    def me
        token = request.headers['token']
        user_id = decode(token)
        user = User.find(user_id)
        render json: user
    end

    def update
        if user.update(user_params)
            render json: user
        else
            render json: user.errors, status: :unprocessable_entity
        end
    end

    def delete
        @user.destroy
    end

    private

    def set_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:username, :password)
    end
end