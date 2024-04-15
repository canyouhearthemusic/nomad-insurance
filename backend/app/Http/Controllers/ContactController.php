<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json([
            'contacts' => Contact::query()
                ->select(['contacts.*', 'users.name as creator_name'])
                ->join('users', 'users.id', '=', 'contacts.user_id')
                ->paginate()
        ]);
    }

    public function store(StoreContactRequest $request)
    {
        if ($contact = $request->user()->contacts()->create($request->validated())) {
            return response()->json([
                'message' => 'The Contact has been created',
                'contact' => $contact
            ]);
        }
    }

    public function show(Contact $contact)
    {
        return response()->json([
            'contact' => $contact
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        if ($contact->update($request->validated())) {
            return response()->json([
                'message' => 'The Contact has been updated',
                'contact' => $contact
            ]);
        }
    }

    public function destroy(Contact $contact)
    {
        if ($contact->deleteOrFail()) {
            return response()->json([
                'message' => 'The Contact has been deleted'
            ]);
        }
    }
}
