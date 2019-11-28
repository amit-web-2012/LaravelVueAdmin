<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Hash;
use Image;

class AuthController extends Controller
{
    public function register (Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $user = User::create($request->toArray());

        $token = $user->createToken('Laravel Password Grant Client')->accessToken;

        $responseData =[
            'token' => $user->id, 'token' => $token, 'username' => $user->name, 'email' => $user->email
        ];

        $response = ['responseData' => $responseData];

        return response($response, 200);

    }
    public function login (Request $request) {

        $user = User::where('email', $request->email)->first();

        if ($user) {

            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                $responseData =[
                    'id' => $user->id, 'token' => $token, 'username' => $user->name, 'email' => $user->email, 'profile_image' => $user->profile_image
                ];
                $response = ['responseData' => $responseData];
                return response($response, 200);
            } else {
                $response = "Wrong Credential";
                return response($response, 422);
            }

        } else {
            $response = 'User does not exist';
            return response($response, 422);
        }

    }
    public function logout (Request $request) {

        $token = $request->user()->token();
        $token->revoke();

        $response = 'You have been succesfully logged out!';
        return response($response, 200);

    }
    public function profile(Request $request) {
        $id = $request->id;
        if($id) {
            $userDetail = User::find($id);
            $response = ['responseData' => $userDetail];
            return response($response, 200);
        } else {
            $response = 'User does not exist';
            return response($response, 422);
        }
    }

    public function updateProfile(Request $request) {
        try {
            $profileImage = $request->file('profile_image');
            $getUser = User::findOrFail($request->id);
            if($getUser) {
                $getUser->name = $request->name;
                if($request->hasFile('profile_image')) {
                    $filenamewithextension = $request->file('profile_image')->getClientOriginalName();
                    $filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);
                    $extension = $request->file('profile_image')->getClientOriginalExtension();
                    $filenametostore = $filename.'_'.time().'.'.$extension;
                    $destinationPath = public_path('/profile_images');
                    $thumb_img = Image::make($profileImage->getRealPath())->resize(200, 200);
                    $thumb_img->save($destinationPath.'/'.$filenametostore,80);        
                    $destinationPath = public_path('/images');
                    $profileImage->move($destinationPath, $filenametostore);
                    $getUser->profile_image = $filenametostore;
                }
                $getUser->save();
                $msg = 'Profile has been updated sucessfully';
                $userDetail =[
                    'name' => $getUser->name, 'profile_image' => $getUser->profile_image, 'msg'=>$msg
                ];
                $response = ['responseData' => $userDetail];
                return response($response, 200);
            } else {
                $responseData = 'User does not exist';
                $response = ['responseData' => $responseData];
                return response($response, 422);
            }
        } catch (\Exception $e) {
            dd($e->getMessage, $e->getLine());
        }   
    }
}
