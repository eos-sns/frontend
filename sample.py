#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
from pathlib import Path
from h5py import File


def create_args():
    parser = argparse.ArgumentParser(usage="-file <file path> "
                                           "-h for full usage")
    parser.add_argument("-file", dest="file",
                        help="file to parse", required=True, type=str)
    return parser


def parse_args(parser):
    args = parser.parse_args()

    input_file = args.file

    assert Path(input_file).is_file()
    assert Path(input_file).exists()

    return {
        'input_file': args.file
    }


def show_file_contents(input_file):
    f = File(input_file, 'r')
    for k, v in f.items():
        print(k, v)


def main():
    args = parse_args(create_args())
    input_file = args['input_file']
    show_file_contents(input_file)


if __name__ == '__main__':
    main()
